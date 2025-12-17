package com.ecomarket.service;

import com.ecomarket.dto.UsuarioDTO;

public interface UsuarioService {
    UsuarioDTO obtenerPerfil(String authHeader);
}
