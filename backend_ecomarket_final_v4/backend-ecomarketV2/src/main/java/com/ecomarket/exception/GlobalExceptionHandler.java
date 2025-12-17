package com.ecomarket.exception;

import jakarta.validation.ConstraintViolationException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.*;

import java.util.Date;
import java.util.HashMap;
import java.util.Map;

@RestControllerAdvice
public class GlobalExceptionHandler {

  // 🔴 Recurso no encontrado (producto, cliente, pedido, etc.)
  @ExceptionHandler(NotFoundException.class)
  public ResponseEntity<Map<String, Object>> notFound(NotFoundException ex) {
    return ResponseEntity.status(HttpStatus.NOT_FOUND)
        .body(Map.of(
            "error", ex.getMessage(),
            "status", 404,
            "timestamp", new Date()
        ));
  }

  // 🟠 Errores de validación en DTOs con @Valid
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

  // 🟠 Violaciones en parámetros validados
  @ExceptionHandler(ConstraintViolationException.class)
  public ResponseEntity<Map<String, Object>> constraint(ConstraintViolationException ex) {
    return ResponseEntity.badRequest()
        .body(Map.of(
            "errors", ex.getMessage(),
            "status", 400,
            "timestamp", new Date()
        ));
  }

  // 🔴 Reglas de negocio genéricas (400)
  @ExceptionHandler(BadRequestException.class)
  public ResponseEntity<Map<String, Object>> badRequest(BadRequestException ex) {
    return ResponseEntity.badRequest()
        .body(Map.of(
            "error", ex.getMessage(),
            "status", 400,
            "timestamp", new Date()
        ));
  }

  // 🟡 CONFLICT: reglas de negocio que impiden la operación
  // 👉 productos con pedidos asociados
  @ExceptionHandler(IllegalStateException.class)
  public ResponseEntity<Map<String, Object>> conflict(IllegalStateException ex) {
    return ResponseEntity.status(HttpStatus.CONFLICT)
        .body(Map.of(
            "error", ex.getMessage(),
            "status", 409,
            "timestamp", new Date()
        ));
  }

  // 🔒 FORBIDDEN: acceso denegado (roles / permisos)
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

  // ⚫ Cualquier error NO controlado
  @ExceptionHandler(Exception.class)
  public ResponseEntity<Map<String, Object>> global(Exception ex) {

    ex.printStackTrace(); // útil en desarrollo

    return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
        .body(Map.of(
            "error", "Error interno en EcoMarket. Intente nuevamente.",
            "details", ex.getMessage(),
            "status", 500,
            "timestamp", new Date()
        ));
  }
}
