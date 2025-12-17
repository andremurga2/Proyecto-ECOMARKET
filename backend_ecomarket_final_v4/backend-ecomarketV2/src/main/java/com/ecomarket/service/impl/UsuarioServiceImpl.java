package com.ecomarket.service.impl;

import com.ecomarket.dto.UsuarioDTO;
import com.ecomarket.model.Usuario;
import com.ecomarket.repository.UsuarioRepository;
import com.ecomarket.security.JwtService;
import com.ecomarket.service.UsuarioService;

import lombok.RequiredArgsConstructor;

import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class UsuarioServiceImpl implements UsuarioService {

    private final JwtService jwtService;
    private final UsuarioRepository usuarioRepository;

    @Override
    public UsuarioDTO obtenerPerfil(String authHeader) {

        String token = authHeader.replace("Bearer ", "");
        String email = jwtService.extractUsername(token);

        Usuario usuario = usuarioRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("Usuario no encontrado"));

        UsuarioDTO dto = new UsuarioDTO();
        dto.setId(usuario.getId());
        dto.setNombre(usuario.getNombre());
        dto.setEmail(usuario.getEmail());
        dto.setRol(usuario.getRol().name());

        return dto;
    }
}
