import { Ionicons } from '@expo/vector-icons';
import { FC } from 'react';
import {
	ScrollView,
	StyleSheet,
	Text,
	TextInput,
	TouchableOpacity,
	View,
} from 'react-native';
import { FilteredData } from './SearchCon';

interface SearchPreProps {
  searchValue: string;
  filteredData: FilteredData[];
  handleToggle: (fileId: number, id: number) => void;
  handleSearch: (text: string) => void;
  onPressFileName: (id: number) => void;
}
/**
 * 単語検索画面のUI
 */
export const SearchPre: FC<SearchPreProps> = ({
	searchValue,
	filteredData,
	handleToggle,
	handleSearch,
	onPressFileName,
}) => {
	return (
		<ScrollView showsVerticalScrollIndicator={false}>
			<View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
				<View style={styles.searchContainer}>
					<Ionicons
						name="search-outline"
						size={24}
						color="#555"
						style={styles.searchIcon}
					/>
					<TextInput
						placeholder="検索"
						value={searchValue}
						onChangeText={(text) => handleSearch(text)}
						style={styles.searchInput}
						autoCapitalize="none"
					/>
				</View>
				{filteredData.length > 0 ? (
					filteredData.map((card) => (
						<View
							key={`${card.fileId}-${card.id}`}
							style={styles.itemContainer}
						>
							<View style={styles.itemHeader}>
								<Text style={styles.itemText}>
									{(() => {
										const str = card.name;
										if (str.toLocaleLowerCase() === searchValue.toLowerCase()) {
											return <Text style={styles.highlight}>{str}</Text>;
										}

										const patternStr = searchValue; // 動的なパターンを表す文字列
										const pattern = new RegExp(`(${patternStr})`, 'gi');
										const resultArr = str.split(pattern).filter(Boolean);

										const resultEle = resultArr.map((item, index) => {
											if (
												item.toLocaleLowerCase() ===
                        searchValue.toLocaleLowerCase()
											) {
												// itemがsearchValueとマッチするか
												return (
													<Text key={index} style={styles.highlight}>
														{item}
													</Text>
												);
											} else {
												return <Text key={index}>{item}</Text>;
											}
										});

										return resultEle;
									})()}
								</Text>
								<TouchableOpacity
									style={styles.fileNameContainer}
									onPress={() => onPressFileName(card.fileId)}
								>
									<Text style={styles.fileNameText}>{card.fileName}</Text>
								</TouchableOpacity>
								<TouchableOpacity
									onPress={() => handleToggle(card.fileId, card.id)}
									style={styles.toggleIconContainer}
								>
									<Ionicons
										name={
											card.isOpen
												? 'chevron-up-outline'
												: 'chevron-down-outline'
										}
										size={24}
										color="#555"
										style={styles.toggleIcon}
									/>
								</TouchableOpacity>
							</View>
							{card.isOpen && (
								<>
									<Text style={styles.meaningText}>意味：{card.mean}</Text>
									<Text style={styles.exampleText}>{card.example}</Text>
								</>
							)}
						</View>
					))
				) : (
					<Text style={styles.noMatchText}>該当する単語が見つかりません</Text>
				)}
			</View>
		</ScrollView>
	);
};

const styles = StyleSheet.create({
	searchContainer: {
		flexDirection: 'row',
		alignItems: 'center',
		height: 50,
		width: '80%',
		borderWidth: 1,
		borderColor: 'gray',
		borderRadius: 5,
		marginTop: 30,
		marginBottom: 40,
	},
	searchIcon: {
		paddingLeft: 8,
	},
	searchInput: {
		flex: 1,
		paddingLeft: 8,
	},
	itemContainer: {
		padding: 12,
		width: '80%',
		borderWidth: 1,
		borderColor: 'gray',
		borderRadius: 5,
		fontSize: 16,
	},
	itemHeader: {
		flexDirection: 'row',
		alignItems: 'center',
	},
	itemText: {
		paddingLeft: 8,
		width: '40%',
		fontSize: 16,
	},
	highlight: {
		color: 'red',
	},
	fileNameContainer: {
		width: '40%',
	},
	fileNameText: {
		fontSize: 16,
		color: '#06c3ff',
		textDecorationLine: 'underline',
		alignSelf: 'flex-end',
	},
	toggleIconContainer: {
		width: '20%',
	},
	toggleIcon: {
		alignSelf: 'flex-end',
	},
	meaningText: {
		fontSize: 16,
		marginLeft: 8,
		marginTop: 8,
	},
	exampleText: {
		fontSize: 16,
		marginLeft: 8,
		marginTop: 8,
		borderWidth: 1,
		borderColor: 'gray',
		padding: 12,
	},
	noMatchText: {
		marginTop: 100,
		color: 'gray',
		fontSize: 16,
	},
});
