package com.ecomarket.controller;

import com.ecomarket.dto.UsuarioDTO;
import com.ecomarket.service.UsuarioService;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;

import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/usuarios")
@RequiredArgsConstructor
@Tag(
    name = "Usuarios",
    description = "Endpoints relacionados con la información del usuario autenticado"
)
public class UsuarioController {

    private final UsuarioService usuarioService;

    @Operation(
        summary = "Obtener perfil del usuario autenticado",
        description = "Devuelve la información del usuario correspondiente al token JWT enviado en la solicitud"
    )
    @GetMapping("/me")
    public UsuarioDTO obtenerPerfil(@RequestHeader("Authorization") String token) {
        return usuarioService.obtenerPerfil(token);
    }
}
