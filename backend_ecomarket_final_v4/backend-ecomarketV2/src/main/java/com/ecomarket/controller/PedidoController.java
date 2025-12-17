package com.ecomarket.controller;

import com.ecomarket.dto.PedidoDTO;
import com.ecomarket.model.Rol;
import com.ecomarket.model.Usuario;
import com.ecomarket.repository.UsuarioRepository;
import com.ecomarket.service.PedidoService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/pedidos")
@RequiredArgsConstructor
public class PedidoController {

    private final PedidoService pedidoService;
    private final UsuarioRepository usuarioRepo;

    /**
     * Listado:
     * - ADMIN: ve todos
     * - CLIENTE: ve solo los propios
     */
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

    /**
     * Crear pedido:
     * - CLIENTE: se fuerza usuarioId = su propio id (ignora el que venga)
     * - ADMIN: puede crear para cualquier usuario (si lo necesita)
     */
    @PostMapping
    public PedidoDTO crearPedido(@RequestBody PedidoDTO dto, Authentication authentication) {

        String email = authentication.getName();

        Usuario u = usuarioRepo.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("Usuario no encontrado"));

        if (u.getRol() != Rol.ADMIN) {
            dto.setUsuarioId(u.getId());
        } else {
            if (dto.getUsuarioId() == null) {
                dto.setUsuarioId(u.getId());
            }
        }

        return pedidoService.crear(dto);
    }

    /**
     * ADMIN: listar pedidos de un cliente específico
     */
    @PreAuthorize("hasRole('ADMIN')")
    @GetMapping("/cliente/{idCliente}")
    public List<PedidoDTO> listarPorCliente(@PathVariable Long idCliente) {
        return pedidoService.listarPorUsuario(idCliente);
    }

    /**
     * ADMIN: listado total (alias)
     */
    @PreAuthorize("hasRole('ADMIN')")
    @GetMapping("/admin")
    public List<PedidoDTO> listarTodos() {
        return pedidoService.listarTodos();
    }
}
