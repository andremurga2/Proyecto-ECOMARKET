package com.ecomarket.service.impl;

import com.ecomarket.dto.ProductoDTO;
import com.ecomarket.exception.NotFoundException;
import com.ecomarket.model.Categoria;
import com.ecomarket.model.Producto;
import com.ecomarket.repository.CategoriaRepository;
import com.ecomarket.repository.ProductoRepository;
import com.ecomarket.repository.PedidoDetalleRepository;
import com.ecomarket.service.ProductoService;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class ProductoServiceImpl implements ProductoService {

    private final ProductoRepository repo;
    private final CategoriaRepository categoriaRepo;
    private final PedidoDetalleRepository pedidoDetalleRepo; // ✅ NUEVO

    @Override
    public ProductoDTO crear(ProductoDTO dto) {

        Categoria categoria = categoriaRepo.findById(dto.getCategoriaId())
                .orElseThrow(() -> new NotFoundException("Categoría no encontrada"));

        Producto producto = Producto.builder()
                .nombre(dto.getNombre())
                .precio(dto.getPrecio())
                .stock(dto.getStock())
                .imagenUrl(dto.getImagenUrl())
                .categoria(categoria)
                .build();

        repo.save(producto);

        dto.setId(producto.getId());
        dto.setCategoriaId(categoria.getId());
        dto.setImagenUrl(producto.getImagenUrl());
        return dto;
    }

    @Override
    public ProductoDTO actualizar(Long id, ProductoDTO dto) {
        Producto producto = repo.findById(id)
                .orElseThrow(() -> new NotFoundException("Producto no encontrado"));

        producto.setNombre(dto.getNombre());
        producto.setPrecio(dto.getPrecio());
        producto.setStock(dto.getStock());
        producto.setImagenUrl(dto.getImagenUrl());

        if (dto.getCategoriaId() != null) {
            Categoria categoria = categoriaRepo.findById(dto.getCategoriaId())
                    .orElseThrow(() -> new NotFoundException("Categoría no encontrada"));
            producto.setCategoria(categoria);
        }

        repo.save(producto);

        ProductoDTO out = new ProductoDTO();
        out.setId(producto.getId());
        out.setNombre(producto.getNombre());
        out.setPrecio(producto.getPrecio());
        out.setStock(producto.getStock());
        out.setCategoriaId(producto.getCategoria().getId());
        out.setImagenUrl(producto.getImagenUrl());
        return out;
    }

    @Override
    public void eliminar(Long id) {
        if (!repo.existsById(id)) throw new NotFoundException("Producto no encontrado");

        // ✅ VALIDACIÓN ANTES DE BORRAR (evita 500 por FK)
        if (pedidoDetalleRepo.existsByProductoId(id)) {
            throw new IllegalStateException("No se puede eliminar el producto porque tiene pedidos asociados");
        }

        repo.deleteById(id);
    }

    @Override
    public ProductoDTO obtener(Long id) {
        Producto p = repo.findById(id)
                .orElseThrow(() -> new NotFoundException("Producto no encontrado"));

        ProductoDTO dto = new ProductoDTO();
        dto.setId(p.getId());
        dto.setNombre(p.getNombre());
        dto.setPrecio(p.getPrecio());
        dto.setStock(p.getStock());
        dto.setCategoriaId(p.getCategoria().getId());
        dto.setImagenUrl(p.getImagenUrl());
        return dto;
    }

    @Override
    public List<ProductoDTO> listar() {
        return repo.findAll().stream().map(p -> {
            ProductoDTO dto = new ProductoDTO();
            dto.setId(p.getId());
            dto.setNombre(p.getNombre());
            dto.setPrecio(p.getPrecio());
            dto.setStock(p.getStock());
            dto.setCategoriaId(p.getCategoria().getId());
            dto.setImagenUrl(p.getImagenUrl());
            return dto;
        }).toList();
    }

    @Override
    public List<ProductoDTO> listarPorCategoria(Long categoriaId) {
        return repo.findByCategoriaId(categoriaId).stream().map(p -> {
            ProductoDTO dto = new ProductoDTO();
            dto.setId(p.getId());
            dto.setNombre(p.getNombre());
            dto.setPrecio(p.getPrecio());
            dto.setStock(p.getStock());
            dto.setCategoriaId(p.getCategoria().getId());
            dto.setImagenUrl(p.getImagenUrl());
            return dto;
        }).toList();
    }
}
