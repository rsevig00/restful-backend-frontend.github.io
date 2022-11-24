package com.microservices.microservice.security.jwt;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import org.springframework.web.filter.GenericFilterBean;
import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
public class JwtFilter extends GenericFilterBean {
    @Override
    public void doFilter(ServletRequest servletRequest, ServletResponse servletResponse, FilterChain filterChain) throws IOException, ServletException {
        final HttpServletRequest request = (HttpServletRequest) servletRequest;
        final HttpServletResponse response = (HttpServletResponse) servletResponse;
        final String authHeader = request.getHeader("authorization");
        if ("OPTIONS".equals(request.getMethod())) {
            response.setStatus(HttpServletResponse.SC_OK);
            filterChain.doFilter(request, response);
        } else {

            if(authHeader == null || !authHeader.startsWith("Bearer ")){
                throw new ServletException("An exception occurred");
            }

            final String token = authHeader.substring(7);
            Claims claims = Jwts.parser().setSigningKey("microservices").parseClaimsJws(token).getBody();
            request.setAttribute("claims", claims);
            request.setAttribute("notes", servletRequest.getParameter("id"));
            filterChain.doFilter(request, response);

        }

    }
}
