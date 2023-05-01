import MainLayout           from '../components/layouts/MainLayout';
import List                 from '../components/questions/List';

const Questions = ()=>(<List />);
export default Questions

Questions.getLayout = function getLayout(page) {
    return <MainLayout>{page}</MainLayout>;
};