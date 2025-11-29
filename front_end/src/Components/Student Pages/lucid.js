import { 
  LayoutDashboard,  // for dashboard  
  Gauge,            // for speedometer / meter  
  List,              // for list  
  Clipboard,         // for a basic clipboard  
  ClipboardList ,
  ListCollapse,
  FoldVertical,
  ListChevronsUpDown,
  PanelLeftClose
} from 'lucide-react';


function MyIcons() {
  return (
    <div className="icon-set">
      <LayoutDashboard size={24} color="black" />
      <Gauge size={24} color="blue" />
      <List size={24} color="black" />
      <Clipboard size={24} color="black" />
      <ClipboardList size={24} color="black" />
      <ListCollapse size={24} color="blue" />
      <FoldVertical size={24} color="blue" />
      <ListChevronsUpDown size={24} color="blue" />
      <PanelLeftClose />
    </div>
  );
}
export default MyIcons;  