package com.ecomarket.dto;

import com.ecomarket.model.Usuario;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class UsuarioDTO {

    private Long id;
    private String nombre;
    private String email;
    private String rol;

    public UsuarioDTO(Usuario u) {
        this.id = u.getId();
        this.nombre = u.getNombre();
        this.email = u.getEmail();
        this.rol = u.getRol().name();
    }
}
