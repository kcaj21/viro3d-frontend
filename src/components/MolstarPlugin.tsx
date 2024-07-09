import React, { useEffect, createRef } from 'react';
import { DefaultPluginUISpec, PluginUISpec } from 'molstar/lib/mol-plugin-ui/spec';
import { createPluginUI } from 'molstar/lib/mol-plugin-ui';
import { PluginConfig } from 'molstar/lib/mol-plugin/config';
import { renderReact18 } from 'molstar/lib/mol-plugin-ui/react18';
import { PluginUIContext } from "molstar/lib/mol-plugin-ui/context";
import "molstar/lib/mol-plugin-ui/skin/light.scss";
// import { Sequence } from 'molstar/lib/mol-model/sequence';

const MySpec: PluginUISpec = {
    ...DefaultPluginUISpec(),
    config: [
      [PluginConfig.VolumeStreaming.Enabled, false],
      [PluginConfig.Viewport.ShowAnimation, false],

    ]
}

declare global {
    interface Window {
      molstar?: PluginUIContext;
    }
  }

interface MolStarPluginProps {
    modelUrl: string;
}

const MolstarPlugin: React.FC<MolStarPluginProps> = ({ modelUrl }) => {
    const parent = createRef<HTMLDivElement>();

    useEffect(() => {
      async function init() {
          window.molstar = await createPluginUI({
            target: parent.current as HTMLDivElement,
            spec: MySpec,
            render: renderReact18
          });
  
          const data = await window.molstar.builders.data.download(
            { url: modelUrl }, /* replace with your URL */
            { state: { isGhost: true } }
          );
          const trajectory =
            await window.molstar.builders.structure.parseTrajectory(data, "pdb");
          await window.molstar.builders.structure.hierarchy.applyPreset(
            trajectory,
            "default"
          );
      }
      init();
      return () => {
        window.molstar?.dispose();
        window.molstar = undefined;
      };
    }, [modelUrl, parent]);
  
  
  
    return <div ref={parent} />;
  }
export default MolstarPlugin;
