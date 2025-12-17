package com.ecomarket.service;

import com.ecomarket.dto.PedidoDTO;
import java.util.List;

public interface PedidoService {

  PedidoDTO crear(PedidoDTO dto);

  List<PedidoDTO> listarPorUsuario(Long usuarioId);

  List<PedidoDTO> listarTodos();

}
