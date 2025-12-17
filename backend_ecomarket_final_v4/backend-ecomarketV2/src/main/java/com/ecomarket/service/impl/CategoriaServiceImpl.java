package com.ecomarket.service.impl;

import com.ecomarket.dto.CategoriaDTO;
import com.ecomarket.exception.BadRequestException;
import com.ecomarket.exception.NotFoundException;
import com.ecomarket.model.Categoria;
import com.ecomarket.repository.CategoriaRepository;
import com.ecomarket.repository.ProductoRepository;
import com.ecomarket.service.CategoriaService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class CategoriaServiceImpl implements CategoriaService {

  private final CategoriaRepository repo;
  private final ProductoRepository productoRepo;

  @Override
  public CategoriaDTO crear(CategoriaDTO dto) {
    if (dto == null || dto.getNombre() == null || dto.getNombre().trim().isEmpty()) {
      throw new BadRequestException("El nombre de la categoría es obligatorio");
    }

    String nombre = dto.getNombre().trim();

    if (repo.existsByNombre(nombre)) {
      throw new BadRequestException("La categoría ya existe");
    }

    Categoria categoria = Categoria.builder()
        .nombre(nombre)
        .build();

    repo.save(categoria);

    CategoriaDTO out = new CategoriaDTO();
    out.setId(categoria.getId());
    out.setNombre(categoria.getNombre());
    return out;
  }

  @Override
  public List<CategoriaDTO> listar() {
    return repo.findAll().stream().map(c -> {
      CategoriaDTO dto = new CategoriaDTO();
      dto.setId(c.getId());
      dto.setNombre(c.getNombre());
      return dto;
    }).toList();
  }

  @Override
  public void eliminar(Long id) {
    Categoria categoria = repo.findById(id)
        .orElseThrow(() -> new NotFoundException("Categoría no encontrada"));

    // Evitar borrar categorías que tengan productos asociados
    if (productoRepo.existsByCategoriaId(id)) {
      throw new BadRequestException("No se puede eliminar: la categoría tiene productos asociados");
    }

    repo.delete(categoria);
  }
}
