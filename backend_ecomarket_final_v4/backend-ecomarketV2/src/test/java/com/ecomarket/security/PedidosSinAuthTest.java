package com.ecomarket.security;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.web.servlet.MockMvc;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@SpringBootTest
@AutoConfigureMockMvc
class PedidosSinAuthTest {

    @Autowired
    private MockMvc mockMvc;

    @Test
    void listarPedidos_sinAuth_da401o403() throws Exception {
        mockMvc.perform(get("/api/v1/pedidos"))
                .andExpect(status().isForbidden()); // ✅ en tu proyecto está dando 403
        // Si quieres hacerlo flexible:
        // .andExpect(result -> {
        //     int s = result.getResponse().getStatus();
        //     if (s != 401 && s != 403) throw new AssertionError("Status esperado 401 o 403, pero fue " + s);
        // });
    }
}