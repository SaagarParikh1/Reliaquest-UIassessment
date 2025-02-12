import React, { useState } from 'react'; // Add useState
import { createUseStyles } from 'react-jss';
import { useGetPokemons } from '../../hooks/useGetPokemons';
import { useNavigate } from 'react-router-dom'; // Import useNavigate for navigation

export const PokemonList = () => {
  const classes = useStyles();
  const { pokemons, loading } = useGetPokemons();
  const [searchTerm, setSearchTerm] = useState(''); // State for search term
  const navigate = useNavigate(); // Initialize navigate

  // Filter Pokémon based on search term
  const filteredPokemons = pokemons.filter((pkmn) =>
    pkmn.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Function to handle click on a Pokémon
  const handlePokemonClick = (name: string) => {
    navigate(`/pokemon/${name}`); // Navigate to the Pokémon details route
  };

  return (
    <div className={classes.root}>
      {/* Search input field */}
      <input
        type="text"
        placeholder="Search Pokemon..."
        value={searchTerm} // Controlled input
        onChange={(e) => setSearchTerm(e.target.value)} // Update state on change
        className={classes.searchInput}
      />

      {/* Show loading as page is loading */}
      {loading && <div>Loading...</div>}

      {/* Grid layout for Pokemon list */}
      <div className={classes.list}>
        {filteredPokemons.map((pkmn) => (
          <div
            key={pkmn.id}
            className={classes.listItem}
            onClick={() => handlePokemonClick(pkmn.name)} // Add click handler for navigation
          >
            {/* Pokemon images */}
            <img src={pkmn.image} alt={pkmn.name} className={classes.image} />
            {/* Pokemon names */}
            <div className={classes.name}>{pkmn.name}</div>
            {/* Pokemon number */}
            <div className={classes.number}>#{pkmn.number}</div>
            {/* Pokemon type */}
            <div className={classes.types}>{pkmn.types.join(', ')}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

// Styling
const useStyles = createUseStyles(
  {
    root: {
      width: '100%',
      textAlign: 'center',
      padding: '32px',
      boxSizing: 'border-box',
    },

    // Search input styling
    searchInput: {
      width: '100%',
      maxWidth: '400px',
      padding: '12px',
      fontSize: '16px',
      borderRadius: '8px',
      border: '1px solid #ccc',
      marginBottom: '24px',
      outline: 'none',
      color: '#000', // Ensure text color is visible
      backgroundColor: '#fff', // Ensure background color is visible
      '&:focus': {
        borderColor: '#999',
        boxShadow: '0 0 8px rgba(0, 0, 0, 0.1)',
      },
    },

    // Responsive grid
    list: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
      gap: '16px',
      padding: '16px',
    },

    // Styling for each Pokemon box
    listItem: {
      border: '1px solid #ccc',
      borderRadius: '8px',
      padding: '16px',
      textAlign: 'center',
      transition: 'transform 0.3s, box-shadow 0.2s',
      cursor: 'pointer', // Add pointer cursor to indicate clickability
      '&:hover': {
        transform: 'scale(1.1)', // Grow on hover
        boxShadow: '0 8px 16px rgba(0, 0, 0, 0.3)',
        borderColor: '#999',
        backgroundColor: '#001b2c', // Background color change
      },
    },

    // Image 
    image: {
      width: '100px',
      height: '100px',
      borderRadius: '5px',
    },

    // Name 
    name: {
      fontSize: '18px',
      fontWeight: 'bold',
      margin: '8px 0',
    },

    // Number 
    number: {
      fontSize: '14px',
      color: '#666',
    },

    // Type 
    types: {
      fontSize: '14px',
      color: '#666',
    },
  },
  { name: 'PokemonList' }
);
