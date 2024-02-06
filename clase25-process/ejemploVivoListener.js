function listNumbers(...numbers) {
    try {
      const types = numbers.map(num => typeof num);
      if (types.includes('string') || types.includes('boolean')) {
        throw types;
      }
  
      // Resto de la lógica de la función
      console.log("Lista de números:", numbers);
    } catch (error) {
      if (Array.isArray(error)) {
        console.error("Invalid parameters:", error);
        process.exitCode = -4;
      } else {
        throw error;
      }
    }
  }
  
  // Listener para el código de escape -4
  process.on('exit', (code) => {
    if (code === -4) {
      console.log("Proceso finalizado por argumentación inválida en una función");
    }
  });
  
  // Ejemplo de uso
  listNumbers(1, 2, "a", true);