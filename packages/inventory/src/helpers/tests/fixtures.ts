export const rawOpenSRPHierarchy1 = {
  locationsHierarchy: {
    map: {
      '95310ca2-02df-47ba-80fc-bf31bfaa88d7': {
        id: '95310ca2-02df-47ba-80fc-bf31bfaa88d7',
        label: 'The Root Location',
        node: {
          locationId: '95310ca2-02df-47ba-80fc-bf31bfaa88d7',
          name: 'The Root Location',
          attributes: { geographicLevel: 0 },
          voided: false,
        },
        children: {
          '421fe9fe-e48f-4052-8491-24d1e548daee': {
            id: '421fe9fe-e48f-4052-8491-24d1e548daee',
            label: 'bbb',
            node: {
              locationId: '421fe9fe-e48f-4052-8491-24d1e548daee',
              name: 'bbb',
              parentLocation: { locationId: '95310ca2-02df-47ba-80fc-bf31bfaa88d7', voided: false },
              attributes: { geographicLevel: 3 },
              voided: false,
            },
            parent: '95310ca2-02df-47ba-80fc-bf31bfaa88d7',
          },
          '0836e054-30b1-4690-985c-b729aa5fcc53': {
            id: '0836e054-30b1-4690-985c-b729aa5fcc53',
            label: 'aa',
            node: {
              locationId: '0836e054-30b1-4690-985c-b729aa5fcc53',
              name: 'aa',
              parentLocation: { locationId: '95310ca2-02df-47ba-80fc-bf31bfaa88d7', voided: false },
              attributes: { geographicLevel: 1 },
              voided: false,
            },
            parent: '95310ca2-02df-47ba-80fc-bf31bfaa88d7',
          },
        },
      },
    },
    parentChildren: {
      '95310ca2-02df-47ba-80fc-bf31bfaa88d7': [
        '421fe9fe-e48f-4052-8491-24d1e548daee',
        '0836e054-30b1-4690-985c-b729aa5fcc53',
      ],
    },
  },
};
