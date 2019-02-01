    handlers: {
      onDragIcons: data => iconDragHandler(context, data),
      openWeb: url => openURL(url),
      clickSymbol: callback => {
        // 点击组件
      },
      onUpload: callback => {
        console.log('选择文件')
        /** 选择文件 */
        selectIconsFiles()
      },
      /** 文本快填
       * 选择图层放到方法里，会获取最新图层
       * https://sketchplugins.com/d/77-rotate
       */
      onTextFill: data => textFillHandler(context, data),
      /**
       * 图片快填
       * https://sketchplugins.com/d/1165-how-to-create-an-image-layer-insert-to-currentpage
       */
      onImageFill: data => imageFillHandler(context, data)
    }
