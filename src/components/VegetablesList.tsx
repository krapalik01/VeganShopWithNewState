import { useEffect } from 'react';
import VegetableItem from './VegetableItem';
import LoadingVegetableItem from './LoadingVegetableItem';
import { Flex, Group, Title, MantineProvider } from '@mantine/core';
import { useDispatch, useSelector } from 'react-redux';
import type { RootState, AppDispatch } from '../store/store';
import { fetchVegetables } from '../store/vegetablesThunks';

interface BasketItem {
  id: string | number;
  name: string;
  price: number;
  image: string;
  count: number;
}

interface VegetablesListProps {
  onAddToCart: (item: BasketItem) => void;
}

function VegetablesList({ onAddToCart }: VegetablesListProps) {
  const dispatch = useDispatch<AppDispatch>();
  const vegetables = useSelector(
    (state: RootState) => state.vegetables.products
  );
  const loading = useSelector((state: RootState) => state.vegetables.isLoading);
  const error = useSelector((state: RootState) => state.vegetables.error);

  useEffect(() => {
    dispatch(fetchVegetables());
  }, [dispatch]); // кое кто подсказал, что в зависимостях лучше указать dispatch)

  if (loading)
    return (
      <>
        <MantineProvider>
          <Group mr={80} ml={80}>
            <Title mt={100}> Catalog </Title>
            <Flex wrap="wrap" rowGap={28} columnGap={24}>
              {[...Array(30)].map((_, index) => (
                <LoadingVegetableItem key={index} />
              ))}
            </Flex>
          </Group>
        </MantineProvider>
      </>
    );
  if (error) return <div>Ошибка: {error}</div>;

  return (
    <>
      <MantineProvider>
        <Group mr={80} ml={80}>
          <Title mt={100}> Catalog </Title>
          <Flex wrap="wrap" rowGap={28} columnGap={24}>
            {vegetables.map((veg) => (
              <VegetableItem
                key={veg.id}
                id={veg.id}
                name={veg.name}
                price={veg.price}
                image={veg.image}
                onAddToCart={onAddToCart}
              />
            ))}
          </Flex>
        </Group>
      </MantineProvider>
    </>
  );
}

export default VegetablesList;
