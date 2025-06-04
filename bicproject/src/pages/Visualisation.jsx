import React from 'react'

const Visualisation = () => {
  return (
    <div style={{ padding: '20px' }}>
      
      <iframe
        title="Gestion_formation_BIC"
        width="100%"
        height="600"
        src="https://app.powerbi.com/view?r=eyJrIjoiY2FhMDY1ODMtZGYzYi00ZThmLWI3OWItZGVmOTE4OGViOGQ2IiwidCI6ImRiZDY2NjRkLTRlYjktNDZlYi05OWQ4LTVjNDNiYTE1M2M2MSIsImMiOjl9"
        frameBorder="0"
        allowFullScreen={true}
        style={{ border: '1px solid #ccc', borderRadius: '8px' }}
      />
    </div>
  );
  
}

export default Visualisation
