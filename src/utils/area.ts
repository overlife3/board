import { AreaWithBomb, EmptyBomb, MapMine } from "../types/area";
import { Coordinates, TypeCell } from "../types/cell";
import {
  createBombCell,
  createEmptyCell,
  createStartCell,
  createValueCell,
} from "./cell";

export const createArea = (width: number, height: number): AreaWithBomb => {
  const area: EmptyBomb = [];

  for (let i = 0; i < height; i++) {
    const stroke = new Array(width).fill(null);
    area.push(stroke);
  }
  return area;
};

const placementStartCell = (area: AreaWithBomb): MapMine => {
  const areaWithStartCell = structuredClone(area);
  for (let i = 0; i < area.length; i++) {
    for (let j = 0; j < area[0].length; j++) {
      areaWithStartCell[i][j] = createStartCell(i, j);
    }
  }
  return areaWithStartCell;
};

const createEmptySquare = ([x, y]: Coordinates) => {
  const arr = [];
  for (let i = -1; i <= 1; i++) {
    for (let j = -1; j <= 1; j++) {
      arr.push([x + i, y + j]);
    }
  }
  return arr;
};

export const getRandomIndexBomb = (
  currentCoordinates: Coordinates,
  area: AreaWithBomb
): [number, number] => {
  const columnRandomIndex = Math.floor(Math.random() * area.length);
  const strokeRandomIndex = Math.floor(Math.random() * area[0].length);
  const emptySquare = createEmptySquare(currentCoordinates);
  const isOutsideEmptySquare =
    emptySquare.findIndex((coordinate) => {
      const [x, y] = coordinate;
      return x === columnRandomIndex && y === strokeRandomIndex;
    }) === -1;
  if (
    area[columnRandomIndex][strokeRandomIndex] === null &&
    isOutsideEmptySquare
  ) {
    console.log(isOutsideEmptySquare);
    return [columnRandomIndex, strokeRandomIndex];
  } else {
    return getRandomIndexBomb(currentCoordinates, area);
  }
};

export const placementBombCell = (
  currentCoordinates: Coordinates,
  area: AreaWithBomb,
  count: number
): AreaWithBomb => {
  const newArea: AreaWithBomb = structuredClone(area);
  for (let i = 1; i <= count; i++) {
    const [columnRandomIndex, strokeRandomIndex] = getRandomIndexBomb(
      currentCoordinates,
      newArea
    );
    newArea[columnRandomIndex][strokeRandomIndex] = createBombCell(
      columnRandomIndex,
      strokeRandomIndex
    );
  }

  return newArea;
};
const checkInsideBorders = (
  coordinates: Coordinates,
  width: number,
  height: number
) => {
  const [x, y] = coordinates;
  return x >= 0 && y >= 0 && x <= width - 1 && y <= height - 1;
};

export const counterCell = (
  columnIndex: number,
  strokeIndex: number,
  areaWithBomb: AreaWithBomb,
  type: TypeCell
) => {
  let count = 0;
  for (let i = -1; i <= 1; i++) {
    for (let j = -1; j <= 1; j++) {
      let indexStrokeConsidered = strokeIndex + j;
      let indexColumnConsidered = columnIndex + i;
      const isInsideBorders = checkInsideBorders(
        [indexStrokeConsidered, indexColumnConsidered],
        areaWithBomb[0].length,
        areaWithBomb.length
      );

      const isAnotherCell =
        indexColumnConsidered !== columnIndex ||
        indexStrokeConsidered !== strokeIndex;
      if (isInsideBorders) {
        const isBombCell =
          areaWithBomb[indexColumnConsidered][indexStrokeConsidered]?.type ===
          type;
        if (isAnotherCell && isBombCell) {
          count += 1;
        }
      }
    }
  }
  return count;
};

export const placementValueCell = (areaWithBomb: AreaWithBomb): MapMine => {
  const newAreaWithBomb = structuredClone(areaWithBomb);
  for (let i = 0; i < newAreaWithBomb.length; i++) {
    for (let j = 0; j < newAreaWithBomb[0].length; j++) {
      if (newAreaWithBomb[i][j] === null) {
        const countBomb = counterCell(i, j, newAreaWithBomb, "bomb");
        if (countBomb !== 0) {
          newAreaWithBomb[i][j] = createValueCell(i, j, countBomb);
        } else {
          newAreaWithBomb[i][j] = createEmptyCell(i, j);
        }
      }
    }
  }
  return newAreaWithBomb as MapMine;
};

export const createMapMine = (
  currentCoordinates: Coordinates,
  width: number,
  height: number,
  countBomb: number
): MapMine => {
  const area = createArea(width, height); // создаю пустую область
  const areaWithBomb = placementBombCell(currentCoordinates, area, countBomb); // заполняю область бомбами
  const mapMine = placementValueCell(areaWithBomb); // расставляю цифры и пустые ячеейки
  return mapMine;
};

export const createStartArea = (width: number, height: number): MapMine => {
  const area = createArea(width, height);
  const startArea = placementStartCell(area);

  return startArea;
};

const checkEmptyCell = (arrCoordinates: Coordinates[], mapMine: MapMine) => {
  let arr: Coordinates[] = arrCoordinates;
  for (let coordinates of arrCoordinates) {
    const [x, y] = coordinates;
    const cell = mapMine[x][y];
    if (cell.type === "empty") {
      arr.push(...clickEmptyCell(coordinates, mapMine));
      console.log("empty");

      break;
    }
  }

  return arr;
};

export const clickValueCell = (
  coordinates: Coordinates,
  mapMine: MapMine
): Coordinates[] => {
  const [x, y] = coordinates;
  const cell = mapMine[x][y];
  const arrCoordinates: Coordinates[] = [];
  let countMarked = 0;
  for (let i = -1; i <= 1; i++) {
    for (let j = -1; j <= 1; j++) {
      let indexStrokeConsidered = y + j;
      let indexColumnConsidered = x + i;

      if (i === 0 && j === 0) continue;

      const isInsideBorders = checkInsideBorders(
        [indexStrokeConsidered, indexColumnConsidered],
        mapMine[0].length,
        mapMine.length
      );

      if (isInsideBorders) {
        if (mapMine[indexColumnConsidered][indexStrokeConsidered].isMarked) {
          countMarked += 1;
        } else {
          arrCoordinates.push([indexColumnConsidered, indexStrokeConsidered]);
        }
      }
    }
  }
  if (cell.value === countMarked) {
    const res = checkEmptyCell(arrCoordinates, mapMine);
    console.log(res);
    return res;
  } else {
    return [];
  }
};

export const clickEmptyCell = (
  coordinates: Coordinates,
  mapMine: MapMine
): Coordinates[] => {
  // Базовый случай: ячейка с числом.
  // если попадаю на число возвращаю только координаты этого числа
  const [x, y] = coordinates;
  const arrCoordinates = [];
  for (let i = -1; i <= 1; i++) {
    for (let j = -1; j <= 1; j++) {
      let indexStrokeConsidered = y + j;
      let indexColumnConsidered = x + i;

      if (i === 0 && j === 0) continue;

      const isInsideBorders = checkInsideBorders(
        [indexStrokeConsidered, indexColumnConsidered],
        mapMine[0].length,
        mapMine.length
      );

      if (isInsideBorders) {
        const currentCoordinates: Coordinates = [
          indexColumnConsidered,
          indexStrokeConsidered,
        ];
        if (!mapMine[indexColumnConsidered][indexStrokeConsidered].isOpened)
          if (
            mapMine[indexColumnConsidered][indexStrokeConsidered].type ===
            "empty"
          ) {
            // если ячейка уже открыта, то ее проверять не нужно
            mapMine[indexColumnConsidered][indexStrokeConsidered].isOpened =
              true;
            arrCoordinates.push(
              currentCoordinates,
              ...clickEmptyCell(currentCoordinates, mapMine)
            );
          } else {
            arrCoordinates.push(currentCoordinates);
          }
      }
    }
  }

  return arrCoordinates;
};
