package com.ecomarket.repository;

import com.ecomarket.model.PedidoDetalle;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PedidoDetalleRepository extends JpaRepository<PedidoDetalle, Long> {

    boolean existsByProductoId(Long productoId);
}
