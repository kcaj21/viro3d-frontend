import React, { useEffect, createRef } from 'react';
import { DefaultPluginUISpec, PluginUISpec } from 'molstar/lib/mol-plugin-ui/spec';
import { createPluginUI } from 'molstar/lib/mol-plugin-ui';
import { PluginConfig } from 'molstar/lib/mol-plugin/config';
import { renderReact18 } from 'molstar/lib/mol-plugin-ui/react18';
import { PluginUIContext } from "molstar/lib/mol-plugin-ui/context";
import "molstar/lib/mol-plugin-ui/skin/light.scss";
import { PluginSpec } from 'molstar/lib/mol-plugin/spec';
import { PluginBehaviors } from 'molstar/lib/mol-plugin/behavior';
import { PluginLayoutControlsDisplay } from 'molstar/lib/mol-plugin/layout';
// import { Sequence } from 'molstar/lib/mol-model/sequence';

const defaultSpec = DefaultPluginUISpec()

const o = {
  
      layoutIsExpanded: false,
      layoutShowControls: false,
      layoutShowRemoteState: false,
      layoutShowSequence: true,
      layoutShowLog: false,
      layoutShowLeftPanel: true,

      viewportShowExpand: true,
      viewportShowControls: false,
      viewportShowSettings: false,
      viewportShowSelectionMode: false,
      viewportShowAnimation: false,
  
};

const MySpec: PluginUISpec = {
  actions: defaultSpec.actions,
  behaviors: [
      PluginSpec.Behavior(PluginBehaviors.Representation.HighlightLoci, { mark: false }),
      PluginSpec.Behavior(PluginBehaviors.Representation.DefaultLociLabelProvider),
      PluginSpec.Behavior(PluginBehaviors.Camera.FocusLoci),

      PluginSpec.Behavior(PluginBehaviors.CustomProps.StructureInfo),
      PluginSpec.Behavior(PluginBehaviors.CustomProps.Interactions),
      PluginSpec.Behavior(PluginBehaviors.CustomProps.SecondaryStructure),
  ],
  animations: defaultSpec.animations,
  customParamEditors: defaultSpec.customParamEditors,
  layout: {
      initial: {
          isExpanded: false,
      showControls: false,
      // controlsDisplay: 'reactive' as PluginLayoutControlsDisplay //adding this seems maybe to make the view window reactive to the setting panel
      },
  },
  components: {
      ...defaultSpec.components,
      controls: {
          ...defaultSpec.components?.controls,
          top: 'none',
          bottom: 'none',
          left: 'none',
      },
      remoteState: 'none'
  },
    config: [
      [PluginConfig.VolumeStreaming.Enabled, false],
      [PluginConfig.Viewport.ShowAnimation, false],
      [PluginConfig.Viewport.ShowSettings, true],
      [PluginConfig.Viewport.ShowExpand, false],
      [PluginConfig.Viewport.ShowControls, true],
      [PluginConfig.Viewport.ShowTrajectoryControls, false]

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

const MolstarPlugin: React.FC = ({ defaultModel, modelID }) => {
    const parent = createRef<HTMLDivElement>();

    useEffect(() => {
      async function init() {
          window.molstar = await createPluginUI({
            target: parent.current as HTMLDivElement,
            spec: MySpec,
            render: renderReact18
          });
  
          const data = await window.molstar.builders.data.download(
            { url: `http://viro3d-dev.cvr.gla.ac.uk/api/pdb/${defaultModel}-${modelID}.cif` }, /* replace with your URL */
            { state: { isGhost: true } }
          );
          const trajectory =
            await window.molstar.builders.structure.parseTrajectory(data, "mmcif");
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
    }, [modelID, defaultModel, parent]);
  
  
  
    return <div className="" ref={parent} style={{width: "600px", height: "400px", position: "absolute"}} />;
  }
export default MolstarPlugin;