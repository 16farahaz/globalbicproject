import React from 'react';
import FormationCard from '../Formation/FormationCard'; // Assuming you meant NoteCard = TaskCard

const BoardView = ({ formations, search = '' }) => {
  const filteredformations = formations.filter(formation =>
    formation.title?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className='w-full py-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 2xl:gap-10'>
      {filteredformations.map((formation, index) => (
        <FormationCard formation={formation} key={index} />
      ))}
    </div>
  );
};

export default BoardView;
