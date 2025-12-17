package com.ecomarket.repository;

import com.ecomarket.model.Categoria;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CategoriaRepository extends JpaRepository<Categoria, Long> {

  boolean existsByNombre(String nombre);
  Categoria findByNombre(String nombre);


}
