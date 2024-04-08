import { ProjectNode, TempImageProjectNode } from './components/project';

export const ProjectList = [
	new ProjectNode(
		'Meown',
		`Meown is a bla bla bla bla 
		bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bl
		a bla bla bla bla bla bla bla bla bla bla bla 
		bla bla bla`,
		{
			link: {
				click: 'https://meown.net'
			}
		}
	),
	new TempImageProjectNode('assets/istorik-dancing-cat.gif')
];