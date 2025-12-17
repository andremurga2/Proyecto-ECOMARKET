package com.ecomarket.service;

import com.ecomarket.dto.PagoDTO;
import java.util.List;

public interface PagoService {

    PagoDTO crear(PagoDTO dto);

    PagoDTO obtener(Long id);

    List<PagoDTO> listar();
}
