import MainLayout from '../components/layouts/MainLayout';

const Home = () => {
    return (
        <div>
            <div>index</div>
        </div>
    );
};

export default Home;

Home.getLayout = function getLayout(page) {
    return <MainLayout>{page}</MainLayout>;
};
