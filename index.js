/**
 * This class is a helper which help for render virtually
 */
export default class WiVirtualList {
  constructor(config) {
    this._validateConfig(config);

    this.width = config.width;
    this.height = config.height;
    this.itemHeight = config.itemHeight;
    this.totalRows = config.totalRows;
    // this.htmlContainerSelector = config.htmlContainerSelector;
    this.htmlContainerElement = config.htmlContainerElement;
    this.generatorFn = config.generatorFn;
    


    if (!VirtualList) throw new Error('Not yet import virtual-list in html file');
    const vListOptions = {
      totalRows: this.totalRows,
      itemHeight: this.itemHeight,
      generatorFn: this.generatorFn,
    }
    if(this.width) vListOptions.w = this.width
    if(this.height) vListOptions.h = this.height
    this.vList = new VirtualList(vListOptions)
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

  changeContainerHeight(height) {
    this.vList.height = height;
    this.vList.container.style.height = height + 'px';
    this.updateDom();
  }

  /**
   * insert the list into container
   */
  insertVlistDom() {
    // const $container = document.querySelector(this.htmlContainerSelector)
    // $container.appendChild(this.vList.container)

    this.htmlContainerElement.appendChild(this.vList.container)
  }

  updateDom() {
    const totalHeight = this.itemHeight * this.vList.totalRows;
    const screenItemsLen = Math.ceil(this.height / this.itemHeight);
    const cachedItemsLen = screenItemsLen * 3;

    this.vList._renderChunk(
      this.vList.container,
      parseInt(this.vList.container.scrollTop / this.itemHeight) - screenItemsLen,
      cachedItemsLen
    );
    this.vList.scroller.style.height = `${totalHeight}px`;
  }

  scrollToIdx(idx) {
    const screenItemsLen = Math.ceil(this.height / this.itemHeight);
    const cachedItemsLen = screenItemsLen * 3;
    this.vList._renderChunk(
      this.vList.container,
      idx,
      cachedItemsLen
    )
  }

  /**
   * 
   * @param {Object} css  sample {'width': '300px'}
   */
  setContainerStyle(css) {
    for(const [attr, value] of Object.entries(css)) {
      this.vList.container.style[attr] = value
    }
  }


  _validateConfig(config) {
    // if (!config.width) throw new Error('width is required');
    // if (!config.height) throw new Error('height is required');
    if (!config.itemHeight) throw new Error('itemHeight is required');
    if (!config.generatorFn) throw new Error('generatorFn is required');
    if (!config.htmlContainerElement) throw new Error('htmlContainerElement is required');
    if (!config.totalRows) throw new Error('totalRows is required');
  }
}
