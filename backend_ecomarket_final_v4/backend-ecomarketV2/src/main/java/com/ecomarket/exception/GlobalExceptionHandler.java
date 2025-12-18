package com.ecomarket.exception;

import jakarta.validation.ConstraintViolationException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.http.converter.HttpMessageNotReadableException;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.core.AuthenticationException;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.*;

import java.util.Date;
import java.util.HashMap;
import java.util.Map;

@RestControllerAdvice
public class GlobalExceptionHandler {

  // 🔴 Recurso no encontrado
  @ExceptionHandler(NotFoundException.class)
  public ResponseEntity<Map<String, Object>> notFound(NotFoundException ex) {
    return ResponseEntity.status(HttpStatus.NOT_FOUND)
        .body(Map.of(
            "error", ex.getMessage(),
            "status", 404,
            "timestamp", new Date()
        ));
  }

  // 🟠 Validaciones DTO (@Valid)
  @ExceptionHandler(MethodArgumentNotValidException.class)
  public ResponseEntity<Map<String, Object>> validation(MethodArgumentNotValidException ex) {
    Map<String, String> errors = new HashMap<>();
    ex.getBindingResult().getFieldErrors()
        .forEach(err -> errors.put(err.getField(), err.getDefaultMessage()));

    return ResponseEntity.badRequest()
        .body(Map.of(
            "errors", errors,
            "status", 400,
            "timestamp", new Date()
        ));
  }

  // 🟠 JSON mal formado / body inválido
  @ExceptionHandler(HttpMessageNotReadableException.class)
  public ResponseEntity<Map<String, Object>> notReadable(HttpMessageNotReadableException ex) {
    return ResponseEntity.badRequest()
        .body(Map.of(
            "error", "Body inválido o mal formado",
            "details", ex.getMostSpecificCause() != null
                    ? ex.getMostSpecificCause().getMessage()
                    : ex.getMessage(),
            "status", 400,
            "timestamp", new Date()
        ));
  }

  // 🟠 Validaciones de parámetros
  @ExceptionHandler(ConstraintViolationException.class)
  public ResponseEntity<Map<String, Object>> constraint(ConstraintViolationException ex) {
    return ResponseEntity.badRequest()
        .body(Map.of(
            "errors", ex.getMessage(),
            "status", 400,
            "timestamp", new Date()
        ));
  }

  // 🔴 Reglas de negocio (400)
  @ExceptionHandler(BadRequestException.class)
  public ResponseEntity<Map<String, Object>> badRequest(BadRequestException ex) {
    return ResponseEntity.badRequest()
        .body(Map.of(
            "error", ex.getMessage(),
            "status", 400,
            "timestamp", new Date()
        ));
  }

  // 🟡 CONFLICT (409)
  @ExceptionHandler(IllegalStateException.class)
  public ResponseEntity<Map<String, Object>> conflict(IllegalStateException ex) {
    return ResponseEntity.status(HttpStatus.CONFLICT)
        .body(Map.of(
            "error", ex.getMessage(),
            "status", 409,
            "timestamp", new Date()
        ));
  }

  // 🔒 FORBIDDEN (403)
  @ExceptionHandler(AccessDeniedException.class)
  public ResponseEntity<Map<String, Object>> accessDenied(AccessDeniedException ex) {
    return ResponseEntity.status(HttpStatus.FORBIDDEN)
        .body(Map.of(
            "error", "Acceso denegado",
            "details", ex.getMessage(),
            "status", 403,
            "timestamp", new Date()
        ));
  }

  // 🔑 UNAUTHORIZED (401)
  @ExceptionHandler({ BadCredentialsException.class, AuthenticationException.class })
  public ResponseEntity<Map<String, Object>> unauthorized(Exception ex) {
    return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
        .body(Map.of(
            "error", "No autorizado",
            "details", ex.getMessage(),
            "status", 401,
            "timestamp", new Date()
        ));
  }

  // ⚫ Error genérico (500)
  @ExceptionHandler(Exception.class)
  public ResponseEntity<Map<String, Object>> global(Exception ex) {
    ex.printStackTrace();
    return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
        .body(Map.of(
            "error", "Error interno en EcoMarket. Intente nuevamente.",
            "details", ex.getMessage(),
            "status", 500,
            "timestamp", new Date()
        ));
  }
}
