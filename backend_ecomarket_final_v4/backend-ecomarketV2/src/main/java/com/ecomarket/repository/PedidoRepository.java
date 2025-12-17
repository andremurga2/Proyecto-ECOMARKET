package com.ecomarket.repository;

import com.ecomarket.model.Pedido;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface PedidoRepository extends JpaRepository<Pedido, Long> {

  // Para listar pedidos del usuario
  List<Pedido> findByUsuarioId(Long usuarioId);

}
