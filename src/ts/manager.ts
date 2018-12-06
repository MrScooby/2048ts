import HTMLManager from './htmlManager'

export default class Manager {

    protected gridSize: number = 4;
    protected startTilesNumber: number = 2;
    protected htmlManager: HTMLManager;

        constructor(

        ) {

            this.htmlManager = new HTMLManager();

        }

}