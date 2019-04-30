import { InventoryItem } from '../models';
import {
    alexaSpeaker as alexaSpeakerItem,
    googleHome as googleHomeItem,
    macbookPro as macbookProItem,
    raspberryPiB as raspberryPiBItem
} from './items';

export const googleHome: InventoryItem = {
    item: googleHomeItem,
    quantity: 10
};

export const macbookPro: InventoryItem = {
    item: macbookProItem,
    quantity: 5
};

export const alexaSpeaker: InventoryItem = {
    item: alexaSpeakerItem,
    quantity: 10
};

export const raspberryPiB: InventoryItem = {
    item: raspberryPiBItem,
    quantity: 2
};