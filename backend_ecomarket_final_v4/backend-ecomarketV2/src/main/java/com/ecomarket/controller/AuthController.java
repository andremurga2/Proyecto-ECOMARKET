package com.ecomarket.controller;

import com.ecomarket.dto.AuthRequest;
import com.ecomarket.dto.AuthResponse;
import com.ecomarket.dto.RegisterRequest;
import com.ecomarket.model.Rol;
import com.ecomarket.model.Usuario;
import com.ecomarket.repository.UsuarioRepository;
import com.ecomarket.security.JwtService;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;

import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/auth")
@RequiredArgsConstructor
@Tag(
    name = "Autenticación",
    description = "Endpoints para registro e inicio de sesión. Devuelven un token JWT para consumir rutas protegidas."
)
public class AuthController {

    private final UserDetailsService userDetailsService;
    private final UsuarioRepository usuarioRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;
    private final AuthenticationManager authenticationManager;

    // ========================= LOGIN ===========================
    @Operation(
        summary = "Iniciar sesión (Login)",
        description = "Autentica al usuario mediante email y contraseña. Si las credenciales son correctas, retorna un token JWT y los datos del usuario."
    )
    @ApiResponses(value = {
        @ApiResponse(responseCode = "200", description = "Login exitoso. Retorna token JWT y datos del usuario."),
        @ApiResponse(responseCode = "401", description = "No autorizado. Credenciales incorrectas."),
        @ApiResponse(responseCode = "404", description = "Usuario no encontrado."),
        @ApiResponse(responseCode = "500", description = "Error interno del servidor.")
    })
    @PostMapping("/login")
    public ResponseEntity<AuthResponse> login(@RequestBody AuthRequest request) {

        // Autentica email + password (si falla lanza excepción y Spring responde 401)
        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        request.getEmail(),
                        request.getPassword()
                )
        );

        UserDetails userDetails = userDetailsService.loadUserByUsername(request.getEmail());
        String token = jwtService.generateToken(userDetails);

        Usuario usuario = usuarioRepository.findByEmail(request.getEmail())
                .orElseThrow(() -> new RuntimeException("Usuario no encontrado"));

        return ResponseEntity.ok(new AuthResponse(token, usuario));
    }

    // ======================== REGISTER =========================
    @Operation(
        summary = "Registrar usuario (Registro)",
        description = "Registra un nuevo usuario en el sistema. Por defecto se asigna el rol CLIENTE. Retorna un token JWT y los datos del usuario."
    )
    @ApiResponses(value = {
        @ApiResponse(responseCode = "200", description = "Registro exitoso. Retorna token JWT y datos del usuario."),
        @ApiResponse(responseCode = "400", description = "Solicitud inválida. El email ya está registrado o faltan datos."),
        @ApiResponse(responseCode = "500", description = "Error interno del servidor.")
    })
    @PostMapping("/register")
    public ResponseEntity<AuthResponse> register(@RequestBody RegisterRequest request) {

        if (usuarioRepository.existsByEmail(request.getEmail())) {
            // Mantengo tu comportamiento (400 con body null).
            // Si quieres, puedo mejorarlo para devolver un mensaje claro.
            return ResponseEntity.badRequest().body(null);
        }

        Usuario usuario = Usuario.builder()
                .nombre(request.getNombre())
                .email(request.getEmail())
                .password(passwordEncoder.encode(request.getPassword()))
                .rol(Rol.CLIENTE)
                .build();

        usuarioRepository.save(usuario);

        UserDetails userDetails = userDetailsService.loadUserByUsername(usuario.getEmail());
        String token = jwtService.generateToken(userDetails);

        return ResponseEntity.ok(new AuthResponse(token, usuario));
    }
}
