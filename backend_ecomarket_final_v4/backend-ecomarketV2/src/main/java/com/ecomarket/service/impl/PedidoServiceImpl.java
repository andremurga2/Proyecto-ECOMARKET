package com.ecomarket.service.impl;

import com.ecomarket.dto.PedidoDTO;
import com.ecomarket.dto.PedidoItemDTO;
import com.ecomarket.exception.NotFoundException;
import com.ecomarket.model.Pedido;
import com.ecomarket.model.PedidoDetalle;
import com.ecomarket.model.Producto;
import com.ecomarket.model.Usuario;
import com.ecomarket.repository.PedidoRepository;
import com.ecomarket.repository.ProductoRepository;
import com.ecomarket.repository.UsuarioRepository;
import com.ecomarket.service.PedidoService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class PedidoServiceImpl implements PedidoService {

    private final PedidoRepository repo;
    private final UsuarioRepository usuarioRepo;
    private final ProductoRepository productoRepo;

    @Override
    @Transactional
    public PedidoDTO crear(PedidoDTO dto) {

        Usuario usuario = usuarioRepo.findById(dto.getUsuarioId())
                .orElseThrow(() -> new NotFoundException("Usuario no encontrado"));

        // Normaliza entrada:
        // - Si vienen items, úsalo.
        // - Si viene solo lista de productos, asume cantidad = 1 por ID (compatibilidad).
        List<PedidoItemDTO> items = new ArrayList<>();
        if (dto.getItems() != null && !dto.getItems().isEmpty()) {
            items.addAll(dto.getItems());
        } else if (dto.getProductos() != null && !dto.getProductos().isEmpty()) {
            for (Long id : dto.getProductos()) {
                PedidoItemDTO it = new PedidoItemDTO();
                it.setProductoId(id);
                it.setCantidad(1);
                items.add(it);
            }
        }

        if (items.isEmpty()) {
            throw new IllegalArgumentException("El pedido debe contener al menos 1 producto");
        }

        Pedido pedido = Pedido.builder()
                .usuario(usuario)
                .estado("CREADO") // pendiente de pago
                .total(0)
                .build();

        double total = 0;

        for (PedidoItemDTO item : items) {
            if (item.getProductoId() == null) {
                throw new IllegalArgumentException("ProductoId es obligatorio en cada item");
            }
            if (item.getCantidad() <= 0) {
                throw new IllegalArgumentException("La cantidad debe ser mayor a 0");
            }

            Producto producto = productoRepo.findById(item.getProductoId())
                    .orElseThrow(() -> new NotFoundException("Producto ID " + item.getProductoId() + " no encontrado"));

            // Validación y descuento de stock en la MISMA transacción (inventario en tiempo real)
            if (producto.getStock() < item.getCantidad()) {
                throw new IllegalStateException("Stock insuficiente para producto: " + producto.getNombre());
            }
            producto.setStock(producto.getStock() - item.getCantidad());
            productoRepo.save(producto);

            double precioUnitario = producto.getPrecio();
            double subtotal = precioUnitario * item.getCantidad();
            total += subtotal;

            PedidoDetalle detalle = PedidoDetalle.builder()
                    .pedido(pedido)
                    .producto(producto)
                    .cantidad(item.getCantidad())
                    .precioUnitario(precioUnitario)
                    .subtotal(subtotal)
                    .build();

            pedido.getDetalles().add(detalle);
        }

        pedido.setTotal(total);
        repo.save(pedido);

        return toDTO(pedido);
    }

    @Override
    public List<PedidoDTO> listarPorUsuario(Long usuarioId) {
        return repo.findByUsuarioId(usuarioId).stream()
                .map(this::toDTO)
                .toList();
    }

    @Override
    public List<PedidoDTO> listarTodos() {
        return repo.findAll().stream()
                .map(this::toDTO)
                .toList();
    }

    private PedidoDTO toDTO(Pedido p) {
        PedidoDTO dto = new PedidoDTO();
        dto.setId(p.getId());
        dto.setUsuarioId(p.getUsuario().getId());
        dto.setEstado(p.getEstado());
        dto.setTotal(p.getTotal());

        // ✅ Datos de cliente (útil para ADMIN)
        if (p.getUsuario() != null) {
            dto.setClienteNombre(p.getUsuario().getNombre());
            dto.setClienteEmail(p.getUsuario().getEmail());
        }

        // items recomendados
        List<PedidoItemDTO> items = new ArrayList<>();
        if (p.getDetalles() != null) {
            for (PedidoDetalle d : p.getDetalles()) {
                PedidoItemDTO it = new PedidoItemDTO();
                it.setProductoId(d.getProducto().getId());
                it.setCantidad(d.getCantidad());
                items.add(it);

                // compatibilidad: también llena lista de IDs
                dto.getProductos().add(d.getProducto().getId());
            }
        }
        dto.setItems(items);
        return dto;
    }
}
