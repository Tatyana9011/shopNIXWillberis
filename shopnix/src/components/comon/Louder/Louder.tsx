import preloader from '../../../img/preloader.svg';

const Louder = () => {
  return (<div>
    <img alt='preloder' style={{
      position: 'absolute',
      top: '25%',
      left: '25%',
    }} src={preloader} />
  </div>)
}
export default Louder