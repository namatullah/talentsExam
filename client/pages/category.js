import {
    Alert,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Tooltip,
} from '@mui/material';
import { useState } from 'react';
import MainLayout from '../components/layouts/MainLayout';
import AddIcon from '@mui/icons-material/Add';
import { getCategories } from '../hooks/category';
import Form from '../components/category/Form';
import Categories from '../components/category/Categories';
import AlertMessage from '../components/AlertMessage';

const Category = ({ categories }) => {
    const [open, setOpen] = useState(false);

    const closeForm = () => {
        setOpen(false);
    };

    return (
        <>
            {open && <Form open={open} closeForm={closeForm} />}
            <TableContainer component={Paper} raised="true" elevation={6}>
                <Table aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell
                                colSpan={5}
                                style={{ fontWeight: 'bold' }}
                                align="left"
                            >
                                <Tooltip
                                    title="Add a new category"
                                    arrow
                                    placement="left"
                                >
                                    <AddIcon
                                        color="primary"
                                        onClick={() => setOpen(true)}
                                    />
                                </Tooltip>
                            </TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell
                                style={{ fontWeight: 'bold' }}
                                align="left"
                            >
                                #
                            </TableCell>
                            <TableCell
                                style={{ fontWeight: 'bold' }}
                                align="left"
                            >
                                Category
                            </TableCell>
                            <TableCell
                                style={{ fontWeight: 'bold' }}
                                align="left"
                            >
                                Sub Category
                            </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {categories.categories.length > 0 ? (
                            categories.categories.map((category, index) => (
                                <Categories
                                    category={category}
                                    index={index}
                                    key={category.id}
                                />
                            ))
                        ) : (
                            <TableRow>
                                <TableCell colSpan={4}>
                                    <AlertMessage severity="info" message="No data inserted" />
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </TableContainer>
        </>
    );
};

export async function getStaticProps({ req }) {
    const { data } = await getCategories();
    return {
        props: {
            categories: data,
        },
        revalidate:10,
    };
}

export default Category;

Category.getLayout = function getLayout(page) {
    return <MainLayout>{page}</MainLayout>;
};
