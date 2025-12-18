package com.ecomarket.controller;

import com.ecomarket.dto.PedidoDTO;
import com.ecomarket.model.Rol;
import com.ecomarket.model.Usuario;
import com.ecomarket.repository.UsuarioRepository;
import com.ecomarket.service.PedidoService;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;

import lombok.RequiredArgsConstructor;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/pedidos")
@RequiredArgsConstructor
@Tag(
    name = "Pedidos",
    description = "Endpoints para la gestión de pedidos realizados por los clientes"
)
public class PedidoController {

    private final PedidoService pedidoService;
    private final UsuarioRepository usuarioRepo;

    @Operation(
        summary = "Listar pedidos",
        description = "ADMIN: obtiene todos los pedidos | CLIENTE: obtiene solo sus propios pedidos"
    )
    @GetMapping
    public List<PedidoDTO> listar(Authentication authentication) {

        String email = authentication.getName();

        Usuario u = usuarioRepo.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("Usuario no encontrado"));

        if (u.getRol() == Rol.ADMIN) {
            return pedidoService.listarTodos();
        }
        return pedidoService.listarPorUsuario(u.getId());
    }

    @Operation(
        summary = "Crear pedido",
        description = "CLIENTE: crea un pedido propio | ADMIN: puede crear pedidos para cualquier usuario"
    )
    @PostMapping
    public PedidoDTO crearPedido(@RequestBody PedidoDTO dto, Authentication authentication) {

        String email = authentication.getName();

        Usuario u = usuarioRepo.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("Usuario no encontrado"));

        if (u.getRol() != Rol.ADMIN) {
            dto.setUsuarioId(u.getId());
        } else if (dto.getUsuarioId() == null) {
            dto.setUsuarioId(u.getId());
        }

        return pedidoService.crear(dto);
    }

    @Operation(
        summary = "Listar pedidos por cliente (ADMIN)",
        description = "Permite al administrador obtener los pedidos de un cliente específico"
    )
    @PreAuthorize("hasRole('ADMIN')")
    @GetMapping("/cliente/{idCliente}")
    public List<PedidoDTO> listarPorCliente(@PathVariable Long idCliente) {
        return pedidoService.listarPorUsuario(idCliente);
    }

    @Operation(
        summary = "Listar todos los pedidos (ADMIN)",
        description = "Devuelve el listado completo de pedidos del sistema"
    )
    @PreAuthorize("hasRole('ADMIN')")
    @GetMapping("/admin")
    public List<PedidoDTO> listarTodos() {
        return pedidoService.listarTodos();
    }
}
