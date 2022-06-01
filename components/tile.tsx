import React, {FC} from 'react';
import styles from '../styles/Home.module.css';
import {MosaicTile} from '@prisma/client';
import ColorPicker from './color-picker';

export type PositionedTile = MosaicTile & {
    position: number;
}

const Tile: FC<PositionedTile> = ({x, y, color, position}) => {
    return (<div className={styles.tile} style={{backgroundColor: color}} data-x={x} data-y={y}>
        <div className={styles.tileposition}>
            {position}
        </div>
        <ColorPicker
            x={x}
            y={y}
        />
    </div>)
}

export default Tile