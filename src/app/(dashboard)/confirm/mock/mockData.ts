import { StudentConfirmation } from "../column";

export const generateMockData = (): StudentConfirmation[] => {
	const mockData: StudentConfirmation[] = [];

	const groups = [
		{ gender: "male", level: "ม.4", firstName: "สมชาย", nickName: "ชาย" },
		{ gender: "male", level: "ม.5", firstName: "มานะ", nickName: "นะ" },
		{ gender: "female", level: "ม.4", firstName: "สมศรี", nickName: "ศรี" },
		{ gender: "female", level: "ม.5", firstName: "มานี", nickName: "นี" },
	];

	let idCounter = 1;

	groups.forEach((group) => {
		for (let i = 1; i <= 20; i++) {
			const randomPhone = `08${Math.floor(Math.random() * 100000000)
				.toString()
				.padStart(8, "0")}`;

			mockData.push({
				std_application_id: `APP-${String(idCounter).padStart(4, "0")}`,
				std_user: {
					name: `${group.firstName}${i} รักเรียน`,
					email: `student${idCounter}@example.com`,
				},
				std_info: {
					std_info_gender: group.gender,
					std_info_phone_number: randomPhone,
					std_info_nick_name: `${group.nickName}${i}`,
					std_info_first_name: `${group.firstName}${i}`,
					std_info_last_name: `รักเรียน`,
					std_info_education_level: group.level,
				},
			});
			idCounter++;
		}
	});

	return mockData;
};
