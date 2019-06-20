/**
 * This class is a helper which help for render virtually
 */
class WiVirtualList {
  constructor(config) {
    this._validateConfig(config);

    this.width = config.width;
    this.height = config.height;
    this.itemHeight = config.itemHeight;
    this.totalRows = config.totalRows;
    this.htmlContainerSelector = config.htmlContainerSelector;
    this.generatorFn = config.generatorFn;
    


    if (!VirtualList) throw new Error('Not yet import virtual-list in html file');
    this.vList = new VirtualList({
      w: this.width,
      h: this.height,
      totalRows: 100,
      itemHeight: this.itemHeight,
      generatorFn: this.generatorFn
    })
    this.insertVlistDom();
  }

  /**
   * 
   * @param {Number} num number of row
   */
  setTotalRows(num) {
    this.vList.totalRows = num;
    this.updateDom();
  }

  /**
   * insert the list into container
   */
  insertVlistDom() {
    const $container = document.querySelector(this.htmlContainerSelector)
    $container.appendChild(this.vList.container)
  }

  updateDom() {
    const totalHeight = itemHeight * this.vList.totalRows;
    const screenItemsLen = Math.ceil(height / itemHeight);
    const cachedItemsLen = screenItemsLen * 3;

    this.vList._renderChunk(
      vList.container,
      parseInt(vList.container.scrollTop / itemHeight) - screenItemsLen,
      cachedItemsLen
    );
    this.vList.scroller.style.height = `${totalHeight}px`;
  }


  _validateConfig(config) {
    if (!config.width) throw new Error('width is required');
    if (!config.height) throw new Error('height is required');
    if (!config.itemHeight) throw new Error('itemHeight is required');
    if (!config.generatorFn) throw new Error('generatorFn is required');
    if (!config.htmlContainerSelector) throw new Error('htmlContainerSelector is required');
    if (!config.totalRows) throw new Error('totalRows is required');
  }
}
