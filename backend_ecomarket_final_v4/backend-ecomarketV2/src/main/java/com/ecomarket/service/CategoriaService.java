package com.ecomarket.service;

import com.ecomarket.dto.CategoriaDTO;
import java.util.List;

public interface CategoriaService {

  CategoriaDTO crear(CategoriaDTO dto);

  List<CategoriaDTO> listar();

  void eliminar(Long id);
}
