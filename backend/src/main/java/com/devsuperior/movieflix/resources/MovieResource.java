package com.devsuperior.movieflix.resources;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.devsuperior.movieflix.dto.MovieDTO;
import com.devsuperior.movieflix.dto.SimpleMovieDTO;
import com.devsuperior.movieflix.services.MovieService;

@RestController
@RequestMapping(value = "/movies")
public class MovieResource {

	@Autowired
	private MovieService service;
	
	@PreAuthorize("hasAnyRole('MEMBER', 'VISITOR')")
	@GetMapping
	public ResponseEntity<Page<SimpleMovieDTO>> findByGenre(
		@RequestParam(value = "genreId", defaultValue = "0") Long genreId,
		@RequestParam(value = "name", defaultValue = "") String name, Pageable pageable) {

	Page<SimpleMovieDTO> list = service.findByGenre(genreId ,pageable);

	return ResponseEntity.ok().body(list);
	}
	
	@PreAuthorize("hasAnyRole('MEMBER', 'VISITOR')")
	@GetMapping(value = "/{id}")
	public ResponseEntity<MovieDTO> findById(@PathVariable Long id) {
		MovieDTO dto = service.findById(id);
		return ResponseEntity.ok(dto);
	}
	
}
