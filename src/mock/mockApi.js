export const mockPosts = [
    { id: 1, title: 'Primo post', description: 'Questa è una descrizione del primo post.' },
    { id: 2, title: 'Secondo post', description: 'Descrizione del secondo post.' },
    { id: 3, title: 'Terzo post', description: 'Dettagli sul terzo post.' },
  ];


  export const fetchPosts = () => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(mockPosts);
      }, 1000); 
    });
  };