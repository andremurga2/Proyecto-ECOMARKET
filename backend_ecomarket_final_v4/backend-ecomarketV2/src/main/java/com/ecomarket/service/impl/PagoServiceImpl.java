package com.ecomarket.service.impl;

import com.ecomarket.dto.PagoDTO;
import com.ecomarket.exception.NotFoundException;
import com.ecomarket.model.Pago;
import com.ecomarket.model.Pedido;
import com.ecomarket.repository.PagoRepository;
import com.ecomarket.repository.PedidoRepository;
import com.ecomarket.service.PagoService;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
public class PagoServiceImpl implements PagoService {

    private final PagoRepository pagoRepo;
    private final PedidoRepository pedidoRepo;

    @Override
    @Transactional
    public PagoDTO crear(PagoDTO dto) {

        Pedido pedido = pedidoRepo.findById(dto.getPedidoId())
                .orElseThrow(() -> new NotFoundException("Pedido no encontrado"));

        // Validación mínima (evita pagos inconsistentes)
        if (pedido.getTotal() <= 0) {
            throw new IllegalStateException("El pedido no tiene total válido");
        }
        if (dto.getMonto() <= 0) {
            throw new IllegalArgumentException("El monto debe ser mayor a 0");
        }
        // tolerancia por double
        double diff = Math.abs(dto.getMonto() - pedido.getTotal());
        if (diff > 0.01) {
            throw new IllegalArgumentException("El monto del pago no coincide con el total del pedido");
        }

        if ("PAGADO".equalsIgnoreCase(pedido.getEstado())) {
            throw new IllegalStateException("El pedido ya está pagado");
        }
        if ("CANCELADO".equalsIgnoreCase(pedido.getEstado())) {
            throw new IllegalStateException("No se puede pagar un pedido cancelado");
        }

        Pago pago = Pago.builder()
                .pedido(pedido)
                .monto(dto.getMonto())
                .metodo(dto.getMetodo())
                .estado("COMPLETADO")
                .build();

        pagoRepo.save(pago);

        // Actualiza estado del pedido
        pedido.setEstado("PAGADO");
        pedidoRepo.save(pedido);

        dto.setId(pago.getId());
        dto.setEstado("COMPLETADO");
        // cliente (para auditoría ADMIN)
        dto.setClienteId(pedido.getUsuario().getId());
        dto.setClienteNombre(pedido.getUsuario().getNombre());
        dto.setClienteEmail(pedido.getUsuario().getEmail());

        return dto;
    }

    @Override
    public PagoDTO obtener(Long id) {
        Pago pago = pagoRepo.findById(id)
                .orElseThrow(() -> new NotFoundException("Pago no encontrado"));

        PagoDTO dto = new PagoDTO();
        dto.setId(pago.getId());
        dto.setPedidoId(pago.getPedido().getId());
        dto.setMonto(pago.getMonto());
        dto.setMetodo(pago.getMetodo());
        dto.setEstado(pago.getEstado());
        // cliente
        if (pago.getPedido() != null && pago.getPedido().getUsuario() != null) {
            dto.setClienteId(pago.getPedido().getUsuario().getId());
            dto.setClienteNombre(pago.getPedido().getUsuario().getNombre());
            dto.setClienteEmail(pago.getPedido().getUsuario().getEmail());
        }
        return dto;
    }

    @Override
    public List<PagoDTO> listar() {
        return pagoRepo.findAll().stream().map(pago -> {
            PagoDTO dto = new PagoDTO();
            dto.setId(pago.getId());
            dto.setPedidoId(pago.getPedido().getId());
            dto.setMonto(pago.getMonto());
            dto.setMetodo(pago.getMetodo());
            dto.setEstado(pago.getEstado());
            if (pago.getPedido() != null && pago.getPedido().getUsuario() != null) {
                dto.setClienteId(pago.getPedido().getUsuario().getId());
                dto.setClienteNombre(pago.getPedido().getUsuario().getNombre());
                dto.setClienteEmail(pago.getPedido().getUsuario().getEmail());
            }
            return dto;
        }).toList();
    }
}
