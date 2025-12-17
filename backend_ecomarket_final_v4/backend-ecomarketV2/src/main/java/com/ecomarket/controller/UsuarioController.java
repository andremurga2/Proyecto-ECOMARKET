package com.ecomarket.controller;

import com.ecomarket.dto.UsuarioDTO;
import com.ecomarket.service.UsuarioService;

import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/usuarios")
@RequiredArgsConstructor
public class UsuarioController {

    private final UsuarioService usuarioService;

    @GetMapping("/me")
    public UsuarioDTO obtenerPerfil(@RequestHeader("Authorization") String token) {
        return usuarioService.obtenerPerfil(token);
    }
}
