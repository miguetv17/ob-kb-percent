export default kibana =>  new kibana.Plugin({
  name: 'ob-kb-percent',
  uiExports: {
    visTypes: ['plugins/ob-kb-percent/ob-kb-percent']
  }
});
