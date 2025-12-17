package com.ecomarket.service;

import com.ecomarket.dto.ProductoDTO;
import java.util.List;

public interface ProductoService {

    ProductoDTO crear(ProductoDTO dto);

    ProductoDTO actualizar(Long id, ProductoDTO dto);

    void eliminar(Long id);

    ProductoDTO obtener(Long id);

    List<ProductoDTO> listar();

    List<ProductoDTO> listarPorCategoria(Long categoriaId); // <<< NUEVO
}
