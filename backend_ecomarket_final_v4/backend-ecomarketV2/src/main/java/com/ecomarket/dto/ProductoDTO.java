package com.ecomarket.dto;

import lombok.Data;

@Data
public class ProductoDTO {
  private Long id;
  private String nombre;
  private double precio;
  private int stock;
  private Long categoriaId;

  private String imagenUrl; // ✅ NUEVO
}
