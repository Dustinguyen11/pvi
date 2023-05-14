import React, { ReactSVGElement } from "react";
import { ReactComponent as TrashSVG } from "@app/assets/ic_trash.svg";
import { ReactComponent as SettingSVG } from "@app/assets/ic_setting.svg";
import { ReactComponent as HelpSVG } from "@app/assets/ic_help.svg"; 
import { ReactComponent as LogoutSVG } from "@app/assets/ic_logout.svg";
import { ReactComponent as SearchSVG } from "@app/assets/ic_search.svg"; 
import { ReactComponent as IndexSVG } from "@app/assets/ic_index.svg";
import { ReactComponent as CopySVG } from "@app/assets/ic_copy.svg";
import { ReactComponent as SendSVG } from "@app/assets/ic_send.svg";

type Props = {
    name: string
}
type IconTypes = { [name: string]: React.FunctionComponent<React.SVGProps<
    SVGSVGElement
  > & { title?: string }>};

const iconTypes:IconTypes = {
  trash: TrashSVG,
  setting: SettingSVG,
  help: HelpSVG,
  logout: LogoutSVG,
  search: SearchSVG,
  index: IndexSVG,
  copy: CopySVG,
  send: SendSVG
};

const SVGIconComponent = (props: Props) => {
    let Icon = iconTypes[props.name]; 
  return <Icon {...props} />;
};

export default SVGIconComponent;