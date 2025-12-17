package com.ecomarket.repository;

import com.ecomarket.model.Usuario;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface UsuarioRepository extends JpaRepository<Usuario, Long> {

  // Para login — se usa en UserDetailsService
  Optional<Usuario> findByEmail(String email);

  boolean existsByEmail(String email);

}
