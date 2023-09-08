import { type Signal, component$, useContext } from "@builder.io/qwik";
import { CuexContext } from "../context";
import styles from "./editor.module.css";

interface EditorProps {
  ref?: Signal<HTMLElement | undefined>;
}

export const Editor = component$<EditorProps>(({ ref }) => {
  const { config } = useContext(CuexContext);

  return (
    <div
      ref={ref}
      class={styles["cuex-editor-root"]}
      data-status={config.status}
    >
      <div
        id="cuex-editor"
        class={styles["cuex-editor"]}
        style={{
          fontSize: `${config.fontSize}px`,
          textAlign: `${config.textAlign}`,
          lineHeight: config.lineHeight,
          paddingLeft: `${config.margin}%`,
          paddingRight: `${config.margin}%`,
        }}
        contentEditable="true"
        placeholder="Enter your text here..."
        {...{ autofocus: "true" }}
      >
        Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quaerat
        voluptate, laudantium doloremque minus natus molestias dolorem enim
        neque in officiis hic eligendi ut fuga porro libero, repellendus
        accusantium ipsum, dicta vero. Eligendi cupiditate corporis quod iure
        nemo ea sunt reprehenderit deserunt, explicabo nisi, incidunt, sit est
        dolor? Atque tenetur ipsa, maxime impedit, quas corrupti quod aut
        reprehenderit, enim officiis assumenda quidem! Perspiciatis eum
        necessitatibus error iste et alias quam eos impedit blanditiis autem
        perferendis cumque, atque consectetur voluptatum quidem sint ab ipsam
        dolorum porro maiores. Possimus laboriosam consectetur in doloremque,
        debitis aliquam est hic voluptatum accusantium praesentium. Voluptates,
        accusantium. Id possimus aspernatur facilis ullam debitis omnis
        consequatur tempore consectetur numquam temporibus pariatur perferendis
        est unde iste magni architecto asperiores veniam nemo, cupiditate neque
        laboriosam quibusdam suscipit? Natus eos id distinctio ullam! Eligendi
        totam officia animi, nesciunt ipsam commodi? Ea error, eos voluptas a,
        culpa, temporibus dolore amet dolor suscipit sunt soluta rem tempore
        reprehenderit quis et dignissimos pariatur fugit. Facilis eos optio rem
        numquam necessitatibus, nihil expedita nam asperiores amet repellat
        earum odit quas consectetur? Architecto aliquam dolor veritatis
        repellendus cumque quisquam nobis at hic consectetur dolore eaque
        facilis ut nulla dicta sed optio voluptas itaque aut ipsa, eos
        excepturi!
        <div contentEditable="false" aria-hidden={config.status == "idle"}>
          <hr class="my-12" />
          <p class="h-screen">The end</p>
        </div>
      </div>
    </div>
  );
});
