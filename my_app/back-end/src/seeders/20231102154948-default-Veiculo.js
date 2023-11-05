'use strict';

module.exports = {
  up: (queryInterface) => {
    return queryInterface.bulkInsert('Veiculos', [
      {
        id: "cd99557a-8750-463e-a3fa-7f7bd9ecf37a",
        locadora: "Movida",
        modelo: "Virtus",
        marca: "Volkswagen",
        ano: 2023,
        motor: "1.0",
        portas: 4,
        cambio: "Automatico",
        ar_condicionado: true,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {});
  },

  down: (queryInterface) => {
    return queryInterface.bulkDelete('Veiculos', [
      {
        id: "cd99557a-8750-463e-a3fa-7f7bd9ecf37a"
      }
    ], {});
  },
  

};
