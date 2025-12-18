package com.ecomarket.security;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.web.servlet.MockMvc;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.delete;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@SpringBootTest
@AutoConfigureMockMvc
class ProductoAdminForbiddenTest {

    @Autowired
    private MockMvc mockMvc;

    @Test
    @WithMockUser(username = "cliente@ecomarket.cl", roles = {"CLIENTE"})
    void eliminarProducto_comoCliente_da403() throws Exception {
        mockMvc.perform(delete("/api/v1/productos/admin/1"))
                .andExpect(status().isForbidden())
                .andExpect(jsonPath("$.status").value(403))
                .andExpect(jsonPath("$.error").value("Acceso denegado"));
    }
}
